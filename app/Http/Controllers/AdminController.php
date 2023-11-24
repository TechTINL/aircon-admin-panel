<?php

namespace App\Http\Controllers;

use App\Actions\Admin\GetAdminAction;
use App\Actions\Admin\StoreAdminAction;
use App\Actions\StoreLeaveAction;
use App\Helpers\BreadcrumbHelper;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\StoreLeaveRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Http\Resources\AdminResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    // show Admin List
    public function index(Request $request, GetAdminAction $action): Response
    {
        if ($request->has('deleted')) {
            $admins = $action->execute($request->get('deleted', false));
        }

        return Inertia::render('Admin/List', [
            'breadcrumbs' => BreadcrumbHelper::admin(),
	        'admins' => AdminResource::collection($admins ?? $action->execute()),
        ]);
    }

    // show Admin Create Form
    public function create(): Response
    {
        return Inertia::render('Admin/Create', [
            'breadcrumbs' => BreadcrumbHelper::adminCreate(),
        ]);
    }

    // store Admin
    public function store(StoreAdminRequest $request, StoreAdminAction $action): RedirectResponse
    {
        $action->execute($request->validated());
        return redirect()->route('admin.index');
    }

	// show Admin Edit Form
	public function edit(User $user): Response
	{
		return Inertia::render('Admin/Edit', [
			'breadcrumbs' => BreadcrumbHelper::adminEdit($user->id),
			'admin' => new AdminResource($user),
		]);
	}

	// update Admin
	public function update(UpdateAdminRequest $request, User $user): RedirectResponse
	{
		$user->update($request->validated());
		return redirect()->route('admin.index');
	}

    // delete Admin
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();
        return back()->with('success', 'Admin Deleted Successfully');
    }

	// Store Leave
	public function storeLeave(StoreLeaveRequest $request, StoreLeaveAction $action): RedirectResponse
	{
		$action->execute($request->validated());
		return back()->with('success', 'Leave Applied Successfully');
	}
}
