DIR := $(HOME)/mozilla-unified-clean-2/

default:
	bash generate_data.sh $(DIR) > index.js
