class CreateEmails < ActiveRecord::Migration[7.0]
  def change
    create_table :emails do |t|
      t.string :subject
      t.string :body
      t.string :file
      t.boolean :saved
      t.boolean :deleted
      t.boolean :read
      t.belongs_to :recipient, null: false, foreign_key: { to_table: :users }
      t.belongs_to :sender, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end