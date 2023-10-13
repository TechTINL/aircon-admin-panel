<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'address',
        'billing_address',
    ];

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }
}
