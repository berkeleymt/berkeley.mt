# berkeley.mt

Welcome! This is the new website for the
[Berkeley Math Tournament](https://berkeley.mt/), a UC Berkeley student-led
organization that aims to spread mathematics and the spirit of mathematical
competition globally.

This site is still in early development. One of the primary goals of the site is
to make it easy for anyone to add and update content. To that end, the site is
built with [Zola](https://getzola.org/), a static-site-generator that renders
content from Markdown files.

If you're familiar with Git and GitHub, it should already be fairly easy to edit
content following the instructions listed in this readme. However, we're also
working on adding a visual, git-less way to do basic edits (basically anything
that doesn't involve a custom element or layout). Stay tuned for that!

## Adding content

Most content is rendered from Markdown files that live in the `content/`
directory. To add a page, simply create a file in the appropriate location:

| Path                        | Page               | Notes                                       |
| --------------------------- | ------------------ | ------------------------------------------- |
| `content/_index.md`         | The Home tab       | Fancy banner is in the template             |
| `content/about.md`          | The About tab      |                                             |
| `content/sponsors/index.md` | The Sponsors tab   | In a folder to colocate sponsor logos       |
| `content/news/*.md`         | News posts         | File names should be prefixed with the date |
| `content/events/*.md`       | Event detail pages |                                             |

## Editing templates

Changing how content is rendered or adding special elements (like the banner on
the home page) may require editing a template. Templates are written in
[Tera](https://keats.github.io/tera/), a template engine for HTML.

The default template is `page.html` for pages and `section.html` for section
listings (like the News tab which lists all the posts). The home page has its
own `index.html` template.

Most pages are based on the `base.html` template. Common changes, such as adding
a tab to the tab bar, probably belong here.

## Running the site locally

First, ensure that you have [Zola](https://getzola.org/) and
[Node.js](https://nodejs.org/) installed. Then, simply clone the repository and
run the following commands to get the site running locally:

```bash
npm install
npm run dev
```

A development server should now be running at http://localhost:1111. It should
update automatically as you edit the site, so this is suitable for development.

## Deploying

To make a production build, run:

```bash
npm run build
```

This will make a static build of the site and place the files in the `public/`
folder. Simply copy these files to a web host using your tool of choice to
deploy.

Commits to the `main` branch on the main repository will automatically be
deployed to the live site.
