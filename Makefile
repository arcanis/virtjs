all: Virtjs Virtjs.GameBoy

Virtjs:
	r.js -o builds/configurations/Virtjs.min.js.json

Virtjs.GameBoy:
	r.js -o builds/configurations/Virtjs.GameBoy.min.js.json

release:
	@ [[ `git status --porcelain | head -n1` == "" ]] || ( echo "Repository not clean; please stash changes first" && exit 1 )
	@ ! git show-ref --tags --quiet --verify `cat VERSION.md` || ( echo "There is already a `cat VERSION.md` release; please fix this" && exit 1 )
	make all
	cp builds/Virtjs-latest.min.js builds/Virtjs-`cat VERSION.md`.min.js
	cp builds/Virtjs.GameBoy-latest.min.js builds/Virtjs.GameBoy-`cat VERSION.md`.min.js
	cd examples/gb/angular && make
	git add .
	git commit --allow-empty -m "Releases `cat VERSION.md`"
	git tag -a `cat VERSION.md` -m ''
	git push

.PHONY: all release Virtjs Virtjs.GameBoy
