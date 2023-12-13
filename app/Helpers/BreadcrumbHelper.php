<?php

namespace App\Helpers;

class BreadcrumbHelper
{
    // Dashboard Tab
    public static function dashboard(): array
    {
        return ['name' => 'Dashboard', 'url' => route('dashboard')];
    }

    public static function activity(): array
    {
        $breadcrumbs = [
            self::dashboard(),
        ];

        $breadcrumbs[] = ['name' => 'Recent Activity', 'url' => route('activity.index')];

        return $breadcrumbs;
    }

    // Client Tab
	public static function home(): array
	{
		return ['name' => 'Home', 'url' => route('dashboard')];
	}

	public static function clients(): array
	{
		$breadcrumbs = [
			self::home(),
		];

		$breadcrumbs[] = ['name' => 'Clients', 'url' => route('clients.index')];

		return $breadcrumbs;
	}

	public static function clientProfile($id = null): array
	{
		$breadcrumbs = self::clients();

		if ($id) {
			$breadcrumbs[] = ['name' => 'Client Profile', 'url' => route('clients.profile', $id)];
		}

		return $breadcrumbs;
	}

	// Employee Tab
	public static function employee(): array
	{
		$breadcrumbs = [
			self::home(),
		];

		$breadcrumbs[] = ['name' => 'Employees', 'url' => route('employee.index')];

		return $breadcrumbs;
	}

	public static function employeeCreate(): array
	{
		$breadcrumbs = self::employee();

		$breadcrumbs[] = ['name' => 'Create', 'url' => route('employee.create')];

		return $breadcrumbs;
	}

    // Admin Tab
    public static function admin(): array
    {
        $breadcrumbs = [
            self::dashboard(),
        ];

        $breadcrumbs[] = ['name' => 'Admin', 'url' => route('admin.index')];

        return $breadcrumbs;
    }

    public static function adminCreate(): array
    {
        $breadcrumbs = self::admin();

        $breadcrumbs[] = ['name' => 'Create', 'url' => route('admin.create')];

        return $breadcrumbs;
    }

	public static function adminEdit($id): array
	{
		$breadcrumbs = self::admin();

		$breadcrumbs[] = ['name' => 'Edit', 'url' => route('admin.edit', $id)];

		return $breadcrumbs;
	}
}
