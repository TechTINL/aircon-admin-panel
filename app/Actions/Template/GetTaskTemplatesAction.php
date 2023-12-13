<?php

namespace App\Actions\Template;

use App\Models\TaskTemplate;

class GetTaskTemplatesAction
{
	public function execute()
	{
		return TaskTemplate::latest()->get();
	}
}
