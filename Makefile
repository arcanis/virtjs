VERSION = $(shell sed -n -e 's/\*\*Current Stable Version :\*\* \[\([^]]\+\)\](http:\/\/github\.com\/tree\/\1)/\1/p' README.md)

## Prevent accidental releases

all:
	@ echo "Please specify the make target"

## Release rule, which create a new tag

release:
	@ read -p 'Are you sure to release "$(VERSION)"? ' -n1 -r; echo; [[ $$REPLY =~ ^[Yy]$$ ]]
	@ [[ `git status --porcelain | head -n1` == "" ]] || ( echo "Repository not clean; please stash changes first" && exit 1 )
	@ ! git show-ref --tags --quiet --verify `cat VERSION.md` || ( echo "There is already a `cat VERSION.md` release; please fix this" && exit 1 )
	git commit --allow-empty -m "Releases `cat VERSION.md`"
	git tag -a `cat VERSION.md` -m ''
	git push --tags
	git push origin master:gh-pages

## Phony rule, like usual

.PHONY: all release
