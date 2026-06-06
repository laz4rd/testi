@AGENTS.md

# Claude Instructions

You are assisting with the maintenance of a personal portfolio and engineering blog.

When asked to generate a blog post from a repository, your task is NOT to rewrite the README.

Instead, analyze the repository and create a new file named:

{repoName}.mdx

The output should be written as a personal engineering journal entry documenting:

- Why the project was built
- The problem it attempts to solve
- Design decisions
- Technical implementation details
- Challenges encountered
- Lessons learned
- Future plans

The writing style should resemble a thoughtful development log rather than documentation.

---

## Required Process

Before writing:

1. Read the repository README.
2. Inspect the source code.
3. Inspect the project structure.
4. Determine:
   - Primary language
   - Frameworks
   - Libraries
   - Architecture
   - Notable implementation decisions
5. Infer the likely motivation behind the project from the codebase.
6. Identify interesting technical details that would be valuable to readers.

Do not simply restate README sections.

The codebase should be the primary source of truth.

---

## Frontmatter Format

Every generated article must begin with:

```yaml
---
id: "AUTO"
date: "CURRENT_DATE"
title: "Building {ProjectName}"
category: "{Best Category}"
readTime: "{Estimate} MIN"
status: "PUBLISHED"
description: "{One sentence summary}"
---
```

Generate sensible values automatically.

---

## Blog Structure

Use the following structure:

# Building {ProjectName}

Hook the reader with the problem, curiosity, or frustration that led to the project.

## The Problem

Explain what issue the project solves.

## The Idea

Describe the initial concept.

## Building It

Discuss architecture, implementation details, and technical decisions.

Include code snippets when useful.

## Challenges

Describe interesting engineering obstacles.

## Design Decisions

Explain notable UX, UI, API, or architectural choices.

## What I Learned

Reflect on lessons learned.

## Looking Ahead

Describe future improvements and ideas.

---

## Writing Style

Write in first person.

Examples:

- "I wanted..."
- "I discovered..."
- "One challenge I ran into..."

Avoid:

- Marketing language
- Feature lists
- README-style documentation
- Bullet-heavy writing

Prefer narrative explanations.

The article should feel like an engineering notebook or development journal.

---

## Technical Depth

If the project contains interesting code:

- Explain it.
- Reference specific implementation choices.
- Explain tradeoffs.

Do not invent details that are not supported by the repository.

---

## Images

If screenshots or assets exist:

- Reference them where appropriate.
- Use Markdown image syntax.

Example:

![Application Screenshot](./assets/screenshot.png)

---

## Output

Output ONLY the completed .mdx file content.

Do not explain your reasoning.

Do not provide commentary.

Generate content ready to paste directly into:

content/{repoName}.mdx
