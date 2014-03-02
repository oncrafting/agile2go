FactoryGirl.define do
  factory :task do
    title 'Assigning a tasks to others'
    storie 'When I sign in as "cherry@example.com" And I go to the tasks page I create a task "process long queries in backgroud jobs" assigned to: Rafael Jesus'
    priority 5
    status 'todo'
    association :project
  end
end
