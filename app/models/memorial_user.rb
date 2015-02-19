class MemorialUser < ActiveRecord::Base
  belongs_to :user
  belongs_to :memorial
end
