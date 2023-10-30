import { getDeepLocation } from "./getDeepLocation"

export function dispatchWebhooks(nodes, webhookSiteActive, serviceNowActive) {

    nodes.forEach(service => {
        if (service.data.color === 'red' || service.data.color === 'orange') {

            const deepFullLocation = getDeepLocation(service.data.id)

            const bodyData = {
                ...service.data,
                rawLocation: service.data.id.replaceAll(':', ' → '),
                deepFullLocation: deepFullLocation,
                timestamp: service.data.updatedAt.seconds,
                timestampString: new Date(service.data.updatedAt.seconds).toISOString(),
                color: undefined,
                position: undefined,
                updatedAt: undefined,
                status: service.data.status.trim(),
                description: `Incidente criado automático - Sala ${service.data.label} - Localizado no pavimento ${deepFullLocation.children.children.entityName} - do prédio ${deepFullLocation.children.entityName} - criticidade: ${service.data.criticity}`,
            }

            if (webhookSiteActive) {
                fetch('https://webhook.site/bf27f73c-fa0d-4541-aed8-f12c3361d0b6', {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify(bodyData)
                }).then(resp => console.log('webhookSiteActive resp =>', resp))
            }

            if (serviceNowActive) {
                fetch('https://us-central1-hackathon-4matt.cloudfunctions.net/webhookServiceNow', {
                    method: 'POST',
                    body: JSON.stringify({
                        caller_id: "4490693e1b42f1d034255311604bcb14",
                        short_description: "UFJF - Grupo 3 - (Caio Vieira e Jonas Henrique) - Incidente hackathon", 
                        description: `
                        incidente criado automático - [nome do processo] - hospedado em  [nome do host] - virtualizado por [nome do servidor] - criticidade: [criticidade]`, 
                        category: "software", 
                        work_notes: `Data de parada: ${bodyData.timestampString}`,
                        allEventData: bodyData
                    })
                }).then(r => r.json()).then(resp => console.log('serviceNowActive resp => ', resp))
            }
        }
    })

}
