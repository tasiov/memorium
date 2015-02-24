class Memorial < ActiveRecord::Base
	has_many :memorial_users
	has_many :users, through: :memorial_users

	def self.search(search)
	  search_condition = "%" + search + "%"
      find(:all, :conditions => ['first_name LIKE ?', search_condition])
    end
end
