# berkeley.mt

Welcome! This is the new website for the
[Berkeley Math Tournament](https://berkeley.mt/), a UC Berkeley student-led
organization that aims to spread mathematics and the spirit of mathematical
competition globally.

This site is still in early development. One of the primary goals is to make it
easy for anyone to add and update content. To that end, the site is built with
[Zola](https://getzola.org/), a static-site-generator that renders content from
Markdown files.

If you're familiar with Git and GitHub, it should already be fairly easy to edit
content following the instructions listed in this readme. However, we're also
working on adding a visual, git-less way to do basic edits (basically anything
that doesn't involve a custom element or layout). Stay tuned for that!

## Adding content

Most content is rendered from Markdown files that live in the `content/`
directory.

To add or edit a page, simply work on a file in the appropriate location:

| Path                        | Page               | Notes                                        |
| --------------------------- | ------------------ | -------------------------------------------- |
| `content/_index.md`         | The Home tab       | Fancy banner is in the `index.html` template |
| `content/about.md`          | The About tab      |                                              |
| `content/sponsors/index.md` | The Sponsors tab   | In a folder to colocate sponsor logos        |
| `content/news/*.md`         | News posts         | File names should be prefixed with the date  |
| `content/events/*.md`       | Event detail pages |                                              |

## Writing Markdown

These content files are written in Markdown, which is a lightweight way to add
formatting to plain text documents. If you've sent bold text on Discord (or many
other platforms), you've already used Markdown!

For those unfamiliar, a cheat sheet is available
[here](https://commonmark.org/help/).

In addition to standard Markdown, we provide the following special components,
called _shortcodes_:

<table>
  <thead>
    <th>Shortcode</th>
    <th>Example</th>
    <th>Rendered</th>
  </thead>
  <tbody>
    <td>Button</td>
    <td>
<pre>
{% button_link(href="https://contestdojo.com/") %}
Register on ContestDojo
{% end %}
</pre>
    </td>
    <td>
      <img src="button-example.png">
    </td>
  </tbody>
</table>

Every Markdown file in this repository also has a special block at the very top
called _front matter_, delimited by `+++`. Here, you can specify additional
properties for each page, such as the title or date.

If you're adding a new page and not sure what to put for front matter, try
looking at a page similar to the one you're adding and basing it on that. Feel
free to ask the Tech team any questions.

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
deployed to the live site. Look out for little green check marks next to commits
on GitHub!
