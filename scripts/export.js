const { getFhirResourceJSON } = require('../src/lib/fhir')

const datatype = process.argv[2] || 'stu2'
const fileTarget = process.argv[3] || './export.json'

getFhirResourceJSON(datatype, fileTarget)