.PHONY: clean build deploy

clean:
	@rm -rf out

build: clean
	@yarn run build

deploy: build
	aws s3 sync out/ s3://cloudvane.cliffom.net/ --delete
	aws cloudfront create-invalidation --distribution-id EBTL5QTXXPKNK --paths "/*" --no-cli-pager