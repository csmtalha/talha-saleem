---
title: "WordPress Hacked With Casino Spam: How I Cleaned a 4-Month Takeover"
description: "A 'website is down' message uncovered a four-month WordPress takeover: 700+ casino spam posts, fake admins, hidden API keys and backdoors. How I cleaned it and the hardening checklist I now use."
date: "2026-10-12"
image: "/images/blog/hacked-wordpress-casino-spam-cleanup.jpg"
linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7515463051563839488/"
tags: ["WordPress", "WordPressSecurity", "CyberSecurity", "IncidentResponse", "WebSecurity", "MalwareRemoval", "SEOSpam", "WebDevelopment"]
---

Last week I got a WordPress "the website is down" message. It turned out to be a lot more than a crash.

The site had been quietly taken over months earlier and turned into a spam engine. The crash was the only visible symptom. Everything else had been running in the background for four months.

This is what I found, how I cleaned it up, and the checklist I now give every WordPress site owner.

---

## What the attackers had set up

Once I looked past the error, the picture was clear. The site was no longer a business website. It was a publishing platform for someone else:

- **700+ casino and betting posts in 20+ languages**, all indexed by Google
- **Hidden spam links injected into the home page**
- **4 fake admin accounts**
- **5 "application passwords"**, API keys that survive password changes, running automated posting
- **Backdoor files disguised as a theme and a must-use plugin**

Each piece had a job. The posts and hidden links sold rankings to gambling sites. The fake admins and application passwords kept the attackers' access alive. The backdoors made sure that even if someone deleted the obvious junk, they could walk straight back in.

## Why nobody noticed for four months

Nothing looked wrong from the front of the site until it crashed. That is what makes this kind of compromise dangerous: it is designed to be quiet. The spam pages lived alongside the real content, the injected links were hidden from normal visitors, and the automated posting ran through API keys rather than anyone logging in.

The longer it runs, the more damage it does: Google indexes the spam, the domain picks up a gambling-spam reputation, and every week the clean-up gets bigger.

## How I cleaned it up

I did not start by deleting things on the live site. On a compromised site you can't trust the files, the admin screens or even the plugins you would use to clean it.

**1. Pulled the database into a local environment.** Working on a copy let me inspect everything safely and take my time, without touching production while I was still learning what was there.

**2. Audited it table by table.** Posts, users, user meta, options, comments. Spam in WordPress rarely lives in one place: the posts are in `wp_posts`, the fake accounts are in `wp_users`, application passwords sit in `wp_usermeta`, and injected widgets and links hide in `wp_options`.

**3. Removed every spam post, user, comment and injected widget**, then **restored the home page from its last clean revision** instead of hand-editing it.

**4. Verified the result.** I ran a full database search for the spam signatures and confirmed zero matches remained. "It looks clean" is not the same as "it is clean".

The site is back online, clean and hardened.

## What I learned: a WordPress hardening checklist

**"Cleaning" a hacked site isn't enough. Rebuild from a verified-clean copy.**
Backdoors are built to survive a clean-up. Reinstall WordPress core, themes and plugins from their official sources, and bring back only content you have verified, not files you can't vouch for.

**Changing your password doesn't log an attacker out.**
Application passwords keep working after a password reset. Check **Users → Profile → Application Passwords** for every account and revoke anything you don't recognise. If you use WP-CLI, `wp user application-password list <user>` shows them too.

**Outdated plugins and file-manager plugins are open doors.**
Update everything, remove plugins you no longer use, and never leave a file-manager plugin installed on a live site. It hands anyone who gets in a full editor for your server.

**One login per person, with 2FA. No shared admin accounts.**
Shared logins make it impossible to tell a real admin from an intruder, and impossible to revoke one person's access cleanly.

**Someone has to own website upkeep. Neglect is the real vulnerability.**
Most compromised sites are not targeted. They are found by bots scanning for whatever was left unpatched. A site with an owner gets updates, backups and a monthly look at its users. A site without one gets taken over.

## Signs your WordPress site may already be compromised

If you are reading this because something feels off, check these first:

- Admin or editor accounts you don't recognise under **Users**
- **Application passwords** you didn't create
- Pages in Google you never published. Search `site:yourdomain.com casino` or `site:yourdomain.com` plus another language
- Unknown files in `wp-content/mu-plugins`, or theme folders you never installed
- Links on your home page that only show up in the page source
- Sudden crashes, slowdowns or a hosting provider warning about resource usage

## After the clean-up: getting Google to forget the spam

If spam pages were indexed, deleting them is only half the job. Make sure the old spam URLs now return a 404 or 410, check **Security issues** and **Manual actions** in Google Search Console, use the **Removals** tool for the worst URLs, and resubmit your sitemap so Google recrawls the clean site.

---

Have you ever inherited a hacked or compromised codebase? What was the first thing you did?

If your WordPress site is behaving strangely, or you need someone to own its upkeep so this never happens, [get in touch](/#contact).
