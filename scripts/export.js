const { getFhirResourceJSON } = require('../src/lib/fhir')

const datatype = process.argv[2] || 'stu2'

getFhirResourceJSON(datatype, './export.json')