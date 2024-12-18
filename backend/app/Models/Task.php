<?php

namespace App\Models;

use App\Traits\ScopedByUser;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends BaseModel
{
    use SoftDeletes, ScopedByUser;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tasks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'deadline',
        'status',
    ];

    /**
     * The attributes that are searchable in the query.
     *
     * @var array<int, string>
     */
    protected $searchables = [
        'title',
        'description',
        'deadline',
    ];

    /**
     * The columns that are searchable in the query.
     *
     * @var array<string, string>
     */
    protected $searchableColumns = [
        'user_id' => '=',
        'title' => 'LIKE',
        'description' => 'LIKE',
        'deadline' => 'LIKE',
        'status' => '=',
    ];

    /**
     * Get the user that owns the task.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
