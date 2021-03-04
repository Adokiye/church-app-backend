import ApiLogs from '../models/api-log'

export const ApiLogger = async (
  third_party_details,
  third_party,
  third_party_config = {},
  third_party_action = '',
  third_party_personal_details = {}
) => {
  if (third_party_details.status === 200 || third_party_details.status) {
    await ApiLogs.query().insert({
      info: `Third party api call log for ${third_party}`,
      type: third_party,
      api_data:third_party_details.metaData.details,
      successful:third_party_details.status === 200
    })
    return
  }

  if (third_party === 'POSIST') {
    await ApiLogs.query().insert({
      info: `Third party api call log for ${third_party}`,
      type: third_party,
      api_data: JSON.stringify(third_party_details),
      config: JSON.stringify(third_party_config),
      action: third_party_action,
      personal_details: third_party_personal_details,
      successful: third_party_details.success
    })
    return
  }

  await ApiLogs.query().insert({
    info: `Third party api call log for ${third_party}`,
    type: third_party,
    api_data: JSON.stringify(third_party_details),
    successful: third_party_details.status
  })
}
