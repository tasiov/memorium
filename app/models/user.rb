class User < ActiveRecord::Base
	has_many :memorial_users
	has_many :memorials, through: :memorial_users
	has_many :comments

	has_many :sent_notifications, :class_name => 'Notification', :foreign_key => 'sender_id'
  has_many :received_notifications, :class_name => 'Notification', :foreign_key => 'recipient_id'


	validates :first_name, presence: true, format: /\A[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+\z/u
	validates :last_name, presence: true, format: /\A[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+\z/u
	validates :email, presence: true, uniqueness: true, format: /\A[-a-z0-9~!\z%^&*_=+}{\'?]+(\.[-a-z0-9~!\z%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?\z/i
	validates :password, presence: true, length: { in: 6..20 }

	def self.get_recent(user)
		user.received_notifications.limit(5)
	end

	def self.search(search)
	  if search
		  search_condition = "%" + search + "%"
	      where('first_name LIKE ?', search_condition)
	  else
	  	  []
	  end
  end

  def self.num_notif(user)
    num = user.received_notifications.where(status: "unread").count
    if num != 0
    	"(" + num.to_s + ")"
    else
    	nil
    end
  end
end
