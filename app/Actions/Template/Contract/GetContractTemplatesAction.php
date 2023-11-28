<?php

namespace App\Actions\Template\Contract;

use App\Models\ContractTemplate;
use Illuminate\Database\Eloquent\Collection;

class GetContractTemplatesAction
{
    public function execute(): Collection|array
    {
        return ContractTemplate::query()
            ->latest()
            ->select('id', 'name', 'service_count')
            ->get();
    }
}
