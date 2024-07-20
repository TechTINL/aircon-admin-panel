<?php

namespace App\Http\Controllers;

use App\Actions\Admin\GetEmployeeRolesAction;
use App\Actions\CreateEmployeeAction;
use App\Actions\GetEmployeesAction;
use App\Actions\GetTeamsAction;
use App\Helpers\BreadcrumbHelper;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class EmployeeController extends Controller
{
    // List Employee
	public function index(GetEmployeesAction $action): Response
	{
		return Inertia::render('Employee/List', [
			'breadcrumbs' => BreadcrumbHelper::employee(),
			'employees' => EmployeeResource::collection($action->execute()),
		]);
	}

	// Show Form Create Employee
	public function create(GetTeamsAction $action, GetEmployeeRolesAction $getEmployeeRolesAction): Response
	{
		return Inertia::render('Employee/Create', [
			'breadcrumbs' => BreadcrumbHelper::employeeCreate(),
			'roles' => $getEmployeeRolesAction->execute(),
			'teams' => $action->execute(),
		]);
	}

	// Store Employee
	public function store(StoreEmployeeRequest $request, CreateEmployeeAction $action): RedirectResponse
	{
		$action->execute($request->validated());
		return redirect()->route('employee.index')->with('success', 'Employee has been created');
	}

    public function storeEmployee(Request $request, CreateEmployeeAction $action){
        $request->validate([
            'name' => 'required',
            'phone' => 'required|unique:users',
            'organization' => 'required',
            'role' => 'required',
            'team' => 'required',
            'vehicle' => 'required'
        ]);
        $action->execute($request);
        return response()->json(['success' => true, 'message' => 'Employee has been created']);
    }
}
