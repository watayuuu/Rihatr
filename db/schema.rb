# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_03_23_001630) do

  create_table "active_storage_attachments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "packages", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "package_title", null: false
    t.bigint "package_id", null: false
    t.bigint "package1_id"
    t.bigint "package2_id"
    t.bigint "package3_id"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["package1_id"], name: "index_packages_on_package1_id"
    t.index ["package2_id"], name: "index_packages_on_package2_id"
    t.index ["package3_id"], name: "index_packages_on_package3_id"
    t.index ["package_id"], name: "index_packages_on_package_id"
    t.index ["user_id"], name: "index_packages_on_user_id"
  end

  create_table "trainings", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "training_title", null: false
    t.string "mascle_name", null: false
    t.text "explanation", null: false
    t.text "step1_comment", null: false
    t.text "step2_comment", null: false
    t.text "step3_comment", null: false
    t.text "step4_comment", null: false
    t.boolean "shoulder"
    t.boolean "elbow"
    t.boolean "hand_fingers"
    t.boolean "hip"
    t.boolean "knee"
    t.boolean "ankle"
    t.boolean "front_trank"
    t.boolean "back_trank"
    t.boolean "composite"
    t.boolean "supine"
    t.boolean "prone"
    t.boolean "lateral"
    t.boolean "sitting"
    t.boolean "standing"
    t.boolean "fours"
    t.boolean "stretch"
    t.boolean "muscle_training"
    t.boolean "stability"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "nickname", null: false
    t.string "last_name", null: false
    t.string "first_name", null: false
    t.string "last_name_kana", null: false
    t.string "first_name_kana", null: false
    t.string "occupation", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "packages", "trainings", column: "package1_id"
  add_foreign_key "packages", "trainings", column: "package2_id"
  add_foreign_key "packages", "trainings", column: "package3_id"
  add_foreign_key "packages", "trainings", column: "package_id"
  add_foreign_key "packages", "users"
end
