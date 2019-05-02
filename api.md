# Backend API Documentation
(__Response Format__ for all REST endpoints are JSON unless otherwise noted)

## Read (GET)
app.get('/tasks', callback)
* __Catalyst__: User loads the application in the browser window
* __Use-case__: User wants to view her tasks
* __Callback__: Retrieves all the task, group, and dependency data from the db
* __Request-params__: None

## Update (PUT)
app.put('/tasks/:task-id', callback)
* __Catalyst__: User toggles a task from incomplete to complete
* __Use-case__: User completes a task on her to-do list
* __Callback__: Adds current date to the completed_at column in the task table for the toggled task.
* __Request-params__: toggled task ID

## Update (PUT)
app.put('/dependencies/:task-id/complete', callback)
* __Catalyst__: User toggles a task from incomplete to complete
* __Use-case__: User completes a task on her to-do list
* __Callback__: Updates the pre-req-completed column in the dependecies table to true for all rows whose pre-req-id is equal to to toggledtask ID
* __Request-params__: toggled task ID

## Update (PUT)
app.put('/dependencies/:task-id/incomplete', callback)
* __Catalyst__: User toggles a task from complete back to incomplete
* __Use-case__: User had accidentally toggled the item as complete and now wants to revert to incomplete.
* __Callback__: Updates the pre-req-completed column in the dependecies table to false for all rows with the toggledTask Id in the pre-req-id column. Additionally, task_ids for all rows dependent on the toggled task will be added to a queue and any rows whose pre_req_id is equal to the task_ids in that queue must also be updated with a pre-req-status of 'false'. The callback should return a list of every task_id that was added to the queue.
* __Request-params__: toggled task ID

## Update (PUT)
app.put('/tasks/:task-id/incomplete', callback)
* __Catalyst__: User toggles a task from complete back to incomplete
* __Use-case__: User had accidentally toggled the item as complete and now wants to revert to incomplete.
* __Callback__: Updates the completed_at column to null for every id in the passed-in array
* __Request-params__: an array of task_ids




