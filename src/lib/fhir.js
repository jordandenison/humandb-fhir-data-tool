const fs = require('fs')
const { each, reduce } = require('bluebird')
const superagent = require('superagent')

const fhirResources = {
  stu2: require('../data/fhir-resources-stu2'),
  stu3: require('../data/fhir-resources-stu3')
}

const getFhirResourceJSON = async (datatype = 'stu2', fileTarget = '../data/exported-fhir-stu2-data.json') => {
  const data = await reduce(fhirResources[datatype], async (resourceCount, resource, i) => {
    console.log(`Fetching ${resource} data`)
    const url = datatype === 'stu2' ? 'http://stu2:4002/baseDstu2/' : 'http://stu3:4003/baseDstu3/'
    const result = await superagent.get(`${url}${resource}`)

    if (result.body.total) {
      resourceCount[resource] = result.body.entry.map(entry => entry.resource)
    }

    return resourceCount
  }, {})

  console.log(`Writing JSON to file`)
  fs.writeFileSync(fileTarget, JSON.stringify(data, null, 2))
  console.log(`Complete`)
}

const writeFhirResourceJSON = async (datatype = 'stu2', fileSource = '/resources/shared/fhir/sample/exported-fhir-stu2-data') => {
  const fhirDataFile = fs.readFileSync(fileSource)
  const fhirData = JSON.parse(fhirDataFile)
  const fhirResources = Object.keys(fhirData)
  const url = datatype === 'stu2' ? 'http://stu2:4002/baseDstu2/' : 'http://stu3:4003/baseDstu3/'

  console.log(`Writing ${datatype} JSON to FHIR Server`)

  await each(fhirResources, async resource => {
    console.log(`Importing ${resource} data`)
    const resources = fhirData[resource]
    
    return each(resources, async resourceData => superagent.put(`${url}${resource}/${resourceData.id}`).send(resourceData))
  })

  console.log(`Complete`)
}

module.exports = {
  getFhirResourceJSON,
  writeFhirResourceJSON
}
