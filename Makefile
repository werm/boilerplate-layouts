build: clean
	node build.js

clean:
	rm -rf build

serve:
	node serve.js

.PHONY: build serve clean