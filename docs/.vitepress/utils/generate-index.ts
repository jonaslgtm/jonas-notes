// .vitepress/utils/generate-index.ts
import { readdirSync, statSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

interface NoteInfo {
  title: string
  date: Date
  year: string
  fileName: string
  formattedDate: string
  link: string
}

function getMarkdownInfo(filePath: string): { title: string; date: Date } {
  try {
    let title = ''
    let date = new Date()

    const fileContent = readFileSync(filePath, 'utf-8')
    const { data: frontMatter } = matter(fileContent)

    if (frontMatter.title) {
      title = frontMatter.title
    } else {
      const filename = filePath.split('/').pop() || ''
      title = filename.replace('.md', '')
    }

    if (frontMatter.date) {
      const parsedDate = new Date(frontMatter.date)
      if (!isNaN(parsedDate.getTime())) {
        date = parsedDate
      }
    }

    return { title, date }
  } catch (error) {
    const filename = filePath.split('/').pop() || ''
    return {
      title: filename.replace('.md', ''),
      date: new Date()
    }
  }
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function generateIndexContent(): string {
  const basePath = join(process.cwd(), 'docs/daily-notes')

  if (!existsSync(basePath)) {
    return 'Daily Notes directory not found.'
  }

  const allNotes: NoteInfo[] = []
  let totalCount = 0

  const years = readdirSync(basePath)
    .filter(entry => {
      const fullPath = join(basePath, entry)
      try {
        return statSync(fullPath).isDirectory() && /^\d{4}$/.test(entry)
      } catch {
        return false
      }
    })
    .sort((a, b) => b.localeCompare(a))

  for (const year of years) {
    const yearPath = join(basePath, year)
    let files: string[] = []

    try {
      files = readdirSync(yearPath)
        .filter(file => file.endsWith('.md') && file !== 'index.md')
    } catch (error) {
      console.error(`无法读取年份目录: ${yearPath}`, error)
      continue
    }

    for (const file of files) {
      const filePath = join(yearPath, file)
      try {
        const { title, date } = getMarkdownInfo(filePath)
        const formattedDate = formatDate(date)
        const fileName = file.replace('.md', '')

        allNotes.push({
          title,
          date,
          year,
          fileName,
          formattedDate,
          link: `/daily-notes/${year}/${fileName}`
        })
        totalCount++
      } catch (error) {
        console.error(`处理文件失败: ${filePath}`, error)
      }
    }
  }

  allNotes.sort((a, b) => b.date.getTime() - a.date.getTime())
  const lastUpdate = allNotes.length > 0 ? allNotes[0].formattedDate : formatDate(new Date())

  const notesByYear: { [year: string]: NoteInfo[] } = {}
  allNotes.forEach(note => {
    if (!notesByYear[note.year]) {
      notesByYear[note.year] = []
    }
    notesByYear[note.year].push(note)
  })

  let content = `---
title: Daily Notes 日常笔记
---

# Daily Notes 日常笔记

日常笔记记录（零零散散啥都记系列）

共计 **${totalCount}** 篇（上次更新: ${lastUpdate}）

`

  for (const year of years) {
    const yearNotes = notesByYear[year] || []
    if (yearNotes.length === 0) continue

    content += `\n## ${year} 年 (共计 ${yearNotes.length} 篇)\n\n`

    yearNotes
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .forEach(note => {
        // 只有标题部分添加链接，日期保持不变
        content += `${note.formattedDate} —— [${note.title}](${note.link})\n\n`
      })
  }

  return content
}

export function generateDailyNotesIndex(): void {
  try {
    const content = generateIndexContent()
    const indexPath = join(process.cwd(), 'docs/daily-notes/index.md')
    writeFileSync(indexPath, content, 'utf-8')
    console.log('✅ Daily Notes index.md 已成功生成！')
  } catch (error) {
    console.error('生成 index.md 时出错:', error)
  }
}

// 直接执行
generateDailyNotesIndex()
