Jekyll Plugin: Sitemap.xml Generator
====================================

Sitemap.xml Generator is a Jekyll plugin that generates a sitemap.xml file by traversing all of the available posts and pages.

How To Use:
-----------
1. Copy file into your _plugins folder within your Jekyll project.
2. Ensure url is set in your config file (for example `url: http://danielgroves.net`)
3. In your config file, change `sitemap: filename:` if you want your sitemap to be called something other than sitemap.xml.
4. Change the `sitemap: exclude:` list to exclude any pages that you don't want in the sitemap. 
5. Change the `sitemap: include_posts:` list to include any pages that are looping through your posts (e.g. "/index.html", "/notebook/index.md", etc.). This will ensure that right after you make a new post, the last modified date will be updated to reflect the new post.
6. Run Jekyll: `jekyll build` to re-generate your site.
7. A `sitemap.xml` should be included in your _site folder.

Configuration defaults:

```yaml
sitemap:
    filename: "/sitemap.xml"
    exclude:
        - "/atom.xml"
        - "/feed.xml"
        - "/feed/index.xml"
    include_posts:
        - "/index.html"
    change_frequency_name: "change_frequency"
    priority_name: "priority"
```

Customizations:
---------------
If you want to include the optional changefreq and priority attributes, simply include custom variables in the YAML Front Matter of those files. The names of these custom variables are defined in the config file as `sitemap: change_frequency_name:` and `sitemap: priority_name:`.

Notes:
------
1. The last modified date is determined by the latest date of the following: system modified date of the page or post, system modified date of included layout, system modified date of included layout within that layout, ...

Author: Michael Levin ([http://www.kinnetica.com](http://www.kinnetica.com))
Configuration Update: Daniel Groves ([http://danielgroves.net](http://danielgroves.net))

Distributed Under A [Creative Commons](http://creativecommons.org/licenses/by/3.0/) License
