<?php

namespace App\Actions\Template;

use App\Models\ServiceTemplate;

class GetServiceTemplatesAction
{
	public function execute()
	{
		return ServiceTemplate::latest()->get();
	}
}
