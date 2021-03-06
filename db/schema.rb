# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150308202846) do

  create_table "comments", force: :cascade do |t|
    t.text     "message"
    t.integer  "user_id"
    t.integer  "memorial_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "path"
  end

  add_index "comments", ["memorial_id"], name: "index_comments_on_memorial_id"
  add_index "comments", ["user_id"], name: "index_comments_on_user_id"

  create_table "memorial_users", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "memorial_id"
    t.string   "role"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "memorial_users", ["memorial_id"], name: "index_memorial_users_on_memorial_id"
  add_index "memorial_users", ["user_id"], name: "index_memorial_users_on_user_id"

  create_table "memorials", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "name"
    t.date     "birth_date"
    t.date     "death_date"
    t.string   "path"
    t.string   "crop_top"
    t.string   "crop_left"
    t.string   "crop_width"
  end

  create_table "notifications", force: :cascade do |t|
    t.integer  "sender_id"
    t.integer  "recipient_id"
    t.text     "message"
    t.string   "message_type"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "status"
    t.integer  "memorial_id"
  end

  add_index "notifications", ["memorial_id"], name: "index_notifications_on_memorial_id"
  add_index "notifications", ["recipient_id"], name: "index_notifications_on_recipient_id"
  add_index "notifications", ["sender_id"], name: "index_notifications_on_sender_id"

  create_table "pictures", force: :cascade do |t|
    t.date     "date"
    t.string   "path"
    t.string   "caption"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "page"
    t.integer  "memorial_id"
  end

  add_index "pictures", ["memorial_id"], name: "index_pictures_on_memorial_id"

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "email"
    t.string   "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "last_name"
    t.string   "path"
  end

end
