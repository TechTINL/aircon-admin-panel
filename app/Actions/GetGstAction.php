<?php

namespace App\Actions;

use App\Models\GstAmount;

class GetGstAction
{
    public function execute(): string
    {
        return GstAmount::first()->value;
    }
}
