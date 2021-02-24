var ACTIVATE_BUCOM_PROGRAMS = "update unicas_config.dbo.Program set StartDate = '2020-01-01', Deadline = '2021-10-31', DeadlineDisplay = '2021-10-31', Status = 'active', updatedDate = CURRENT_TIMESTAMP  where Id IN (170865)";
var SELECT_BUCOM_PROGRAMS = 'select top 10 * from unicas_config.dbo.Program';
var AACOMAS_PROGRAM_FEE = "$196.00"

module.exports = { ACTIVATE_BUCOM_PROGRAMS, SELECT_BUCOM_PROGRAMS, AACOMAS_PROGRAM_FEE};