var GET_ESSAYS_APPLICATIONFORMSUBSECTIONID_AACOMAS = "SELECT * FROM unicas_config..applicationformsubsection WHERE displayname = 'Essays' AND formsectionid in (SELECT id FROM unicas_config..applicationformsection WHERE formid = (SELECT id from unicas_config..applicationform WHERE formId = 'AACOMAS 2021'))"

var GET_ESSAYS_APPLICATIONFORMSUBSECTIONID_COUNT_AACOMAS = "SELECT count(*) FROM unicas_config..applicationformsubsection WHERE displayname = 'Essays' AND formsectionid in (SELECT id FROM unicas_config..applicationformsection WHERE formid = (SELECT id from unicas_config..applicationform WHERE formId = 'AACOMAS 2021'))"

module.exports = { GET_ESSAYS_APPLICATIONFORMSUBSECTIONID_AACOMAS, GET_ESSAYS_APPLICATIONFORMSUBSECTIONID_COUNT_AACOMAS};