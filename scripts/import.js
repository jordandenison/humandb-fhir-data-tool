const { writeFhirResourceJSON } = require('../src/lib/fhir')

const datatype = process.argv[0] || 'stu2'

writeFhirResourceJSON(datatype)
