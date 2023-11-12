<?php

namespace App\Helpers;

class BreadcrumbHelper
{
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
}
