# Overview

This webpage serves as a portfolio for all my personal projects, education, and professional experience.

# Challenges

## Old page

My old webpage was a simple, static HTML site with a few sections, but it was far from responsive, breaking everywhere when accessed from mobile phones. It also contained duplicate code throughout, which I had to modify every time I wanted to update something. Initially, it was an okay way to do things, but as the site grew, it became increasingly unmanageable, and some sections were a bit confusing to understand.

## New webpage (this one!)

Keeping the problems from the old version in mind, I wanted to rewrite the entire site from scratch in a way that was responsive on mobile, allowed code reuse, and used modern tools.

The design is based on the [Personal](https://bootstrapmade.com/personal-free-resume-bootstrap-template/) static template from [BootstrapMade](https://bootstrapmade.com/), but heavily modified to fit my needs. Using it as a baseline, I started rewriting everything in React. It went smoothly until I needed more advanced features, like dynamic routes with pre-generated content from JSON and Markdown, since I didn't want the clients to handle all that work.

While researching, I discovered Next.js, a React framework for web development. I migrated everything to Next.js, rewriting a few parts along the way, and thanks to it, I achieved the results I wanted.

Pages like this one (and all game and personal project descriptions) are dynamic routes pre-generated during build time, using a JSON file for metadata and video/main gallery, and a Markdown file for content and descriptions. This approach allowed me to reuse many components and pieces of code, greatly improving maintainability.

This was my first time working on a website built with React + Next.js, so it involved some trial and error until everything worked, but it was a great learning experience with a better-than-expected final result!
