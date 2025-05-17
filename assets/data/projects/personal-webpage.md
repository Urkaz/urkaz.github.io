# Overview

This webpage serves as a porfolio for all my personal projects, education, and professional experience.

# Challenges

## Old page

My old webpage was a simple and static HTML site with a few section, but it was all but responsive, breaking everywhere when visited from mobile phones. It also had duplicate code all around that I had to modify each time I wanted to update something. At the beginning it was an ok way to do thins, but as it started growing, it started being a bit unmanageable, and in some cases like the timeline section, were a bit confusing to understand.

## New webpage (this one!)

With the problems from the old version in mind, I wanted to rewrite it entirely from scratch, and do so in a way that it was responsive to mobile, allowed me to reuse code and was made with modern tools.

The desing is based on the [Personal](https://bootstrapmade.com/personal-free-resume-bootstrap-template/) static template from [BootstrapMade](https://bootstrapmade.com/), but heavily modified to fit my needs. With it as a baseline, I started to rewrite everything with React. It was all good until I started needing more advanced features, like having dynamic routes with pregenerated content from json and markdown as I didn't want the clients to have all that work.

Investigating about that I found Next.js, a React web development framework. I migrated everything to Next.js, having to rewrite a few things in the way, but thans to it I managed to get the result I wanted.

Pages like this one (and all game and personal project descriptions) are dynamic routes that are pregenerated during build time using a json file for the metadata and video/main gallery, and a markdown file for the content and descriptions, reusing a lot of components and code, heling a lot with its maintentance.

This is the first time I worked in a webpage made with React + Next.js, so sometimes it was a bit of trial and error until everything worked, but it was a nice learning experience with a better than expected final result!