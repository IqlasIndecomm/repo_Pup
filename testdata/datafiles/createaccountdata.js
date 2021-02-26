var ACTIVATE_BUCOM_PROGRAMS = "update unicas_config.dbo.Program set StartDate = '2020-01-01', Deadline = '2021-10-31', DeadlineDisplay = '2021-10-31', Status = 'active', updatedDate = CURRENT_TIMESTAMP  where Id IN (170865)";
var SELECT_BUCOM_PROGRAMS = 'select top 10 * from unicas_config.dbo.Program';
var AACOMAS_PROGRAM_FEE = "$196.00"
var CREATE_TILE_PAYLOAD = {"name":"Essays","type":"Custom","sortOrder":9,"allowMultipleSaves":1,"applicationFormSection":{"@id":"20ce1143-bde6-4e95-b3e0-26f5fb63f6d6","id":3250,"createdDate":"2020-04-17 10:41:14","name":"Personal Information","sortOrder":1,"updatedDate":"2020-04-17 10:41:14","templateId":2}}

module.exports = { ACTIVATE_BUCOM_PROGRAMS, SELECT_BUCOM_PROGRAMS, AACOMAS_PROGRAM_FEE, CREATE_TILE_PAYLOAD};