CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: 'AKIAJSDSOVLUOAEWAN6Q',
    aws_secret_access_key: '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',
    region: 'us-west-2',
  }

  if Rails.env.test? || Rails.env.development?
    config.storage = :file
    config.enable_processing = false
    config.root = "#{Rails.root}/tmp"
  else
    config.storage = :fog
  end

  config.cache_dir = "#{Rails.root}/tmp/uploads"
  config.fog_directory = 'memorium-wyncode'
end