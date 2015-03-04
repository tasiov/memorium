class Notification < ActiveRecord::Base
  belongs_to :sender, :class_name => 'User'
  belongs_to :recipient, :class_name => 'User'
  belongs_to :memorial

  validates :sender, presence: true
  validates :recipient, presence: true

  #scope :recent -> { @current_user.received_notifications.where(status: "unread").count }
end
