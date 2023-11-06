<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GeneralNote extends Model
{
    use HasFactory;

	protected $fillable = [
		'note',
		'client_id',
		'created_by',
		'updated_by',
	];

	protected $appends = [
		'created_by_name',
		'updated_by_name',
	];

	public function client(): BelongsTo
	{
		return $this->belongsTo(Client::class);
	}

	public function createdBy(): BelongsTo
	{
		return $this->belongsTo(User::class, 'created_by');
	}

	public function getCreatedByNameAttribute(): string
	{
		return $this->createdBy->name;
	}

	public function updatedBy(): BelongsTo
	{
		return $this->belongsTo(User::class, 'updated_by');
	}

	public function getUpdatedByNameAttribute(): string
	{
		return $this->updatedBy->name;
	}
}
