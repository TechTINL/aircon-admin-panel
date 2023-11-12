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
        'postal_code',
        'address',
        'billing_address',
        'parent_id',
    ];

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

	public function generalNotes(): HasMany
	{
		return $this->hasMany(GeneralNote::class);
	}

    // Get Only first contact
    public function firstContact(): HasOne
    {
        return $this->hasOne(Contact::class)
            ->where('is_primary', true)
            ->orderBy('created_at', 'asc');
    }

    // Addresses
    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class);
    }

	// Sub Clients
	public function subClients(): HasMany
	{
		return $this->hasMany(Client::class, 'parent_id');
	}
}
