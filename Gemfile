source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'jekyll', versions['jekyll']
gem 'asciidoctor'


group :jekyll_plugins do
  gem 'jekyll-sitemap'
  gem 'jekyll-asciidoc'
end

group :development do
  gem 'travis'
end