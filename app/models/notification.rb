class Notification < ActiveRecord::Base
  belongs_to :sender, :class_name => 'User'
  belongs_to :recipient, :class_name => 'User'
  belongs_to :memorial

  validates :sender, presence: true
  validates :recipient, presence: true
end
