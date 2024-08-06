<?php

namespace App\Http\Controllers;

use App\Actions\Admin\GetEmployeeRolesAction;
use App\Actions\GetEmployeesAction;
use App\Http\Resources\EmployeeResource;
use App\Models\Task;
use DateTime;
use Illuminate\Http\Request;

class TasksSchedulerController extends Controller
{
    public function getData(GetEmployeesAction $action, GetEmployeeRolesAction $getEmployeeRolesAction){
        $tasks = Task::select('id','name','assign', 'employee_id', 'hour', 'service_id')->with(['service' => function($query){
            $query->select('id', 'name', 'status', 'service_address', 'service_time');
        }])->get();
        $employees = EmployeeResource::collection($action->execute());
        $roles = $getEmployeeRolesAction->execute();
        return response()->json([
            'tasks' => $tasks,
            'employees' => $employees,
            'roles' => $roles
        ]);
    }

    public function setData(Request $request){
        $task = Task::where('id', $request['taskId'])->with('service')->first();
        $service = $task['service'];

        if($request['employeeId'] !== 0){
            if($task){
                $task['assign'] = 1;
                $task['employee_id'] = $request['employeeId'];
                $service['service_time'] = $request['hour'];
                $task->save();
                $service->save();
            }else{
                return response()->json(['Errors' => ['Error' => 'Task Not Found']], 402);
            }
        }else{
            $task['assign'] = null;
            $task['employee_id'] = null;
            $task['hour'] = null;
            $task->save();
        }
        return response()->json(['message' => 'Task Assigned']);
    }
}
