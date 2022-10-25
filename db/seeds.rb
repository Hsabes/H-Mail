puts "Destroying previous data..."
User.destroy_all
User.reset_pk_sequence
Email.destroy_all
Email.reset_pk_sequence

puts "Seeding Users..."
10.times do
    User.create(
        email: Faker::Name.first_name + "@hmail.com",
        username: Faker::Name.last_name,
        name: Faker::Name.name,
        password: Faker::Internet.password,
        avatar: nil
    )
end

puts "Generating Emails..."
10.times do
    Email.create(
        subject: Faker::Creature::Cat.breed,
        body: Faker::Lorem.sentence,
        file: "test file",
        saved: false,
        deleted: false,
        read: false,
        recipient_id: User.ids.sample,
        sender_id: User.ids.sample
    )
end

