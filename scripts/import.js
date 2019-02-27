const { writeFhirResourceJSON } = require('../src/lib/fhir')

const datatype = process.argv[2] || 'stu2'

writeFhirResourceJSON(datatype)
