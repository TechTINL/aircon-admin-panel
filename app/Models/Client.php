<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    // Get Only first contact
    public function firstContact(): HasOne
    {
        return $this->hasOne(Contact::class)
            ->where('is_primary', true)
            ->orderBy('created_at', 'asc');
    }
}
