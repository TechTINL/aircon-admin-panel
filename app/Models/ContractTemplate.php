<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'service_count',
    ];

    public function scopeFilterContractTemplate($query, array $filters): void
    {
        $query->when($filters['search'] ?? null, fn ($query, $search) => $query
            ->where('name', 'like', '%' . $search . '%'));
    }
}
