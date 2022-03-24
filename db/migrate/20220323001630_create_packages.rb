class CreatePackages < ActiveRecord::Migration[6.0]
  def change
    create_table :packages do |t|
      t.string  :package_title, null: false
      t.references :package, null: false,foreign_key: { to_table: 'trainings' }
      t.references :package1,foreign_key: { to_table: 'trainings' }
      t.references :package2,foreign_key: { to_table: 'trainings' }
      t.references :package3,foreign_key:{ to_table: 'trainings' }
      t.references :user, null: false,foreign_key: true
      t.timestamps
    end
  end
end
