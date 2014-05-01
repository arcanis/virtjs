## Strange to see a Makefile for a web application, right ?
## Well, it's still the best way to generate the appcache :)

APPCACHE=application.appcache

appcache:
	rm -f ${APPCACHE}
	@echo 'CACHE MANIFEST'                                       > ${APPCACHE}
	@echo "# Generated $$(date)"                                >> ${APPCACHE}
	@echo ''                                                    >> ${APPCACHE}
	@echo 'CACHE:'                                              >> ${APPCACHE}
	find ../../../libraries ./ -type f -not -path ./${APPCACHE} >> ${APPCACHE}
	@echo ''                                                    >> ${APPCACHE}
	@echo 'NETWORK:'                                            >> ${APPCACHE}
	@echo '*'                                                   >> ${APPCACHE}

.PHONY: appcache
